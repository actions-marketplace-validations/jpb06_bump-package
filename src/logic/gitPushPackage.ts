import simpleGit from "simple-git";

import { info } from "@actions/core";
import { context } from "@actions/github";

export const pushNewVersion = async (version: string): Promise<void> => {
  const git = simpleGit({ baseDir: process.cwd() });

  info(`> Pushing new version ...`);
  await git
    .addConfig("user.name", `${context.actor}`)
    .addConfig("user.email", `${context.actor}@users.noreply.github.com`);

  info(`> Creating a tag ...`);
  await git
    .add("./package.json")
    .commit(`Bumping package version to ${version}`)
    .push();

  await git.addTag(version).pushTags();
};
